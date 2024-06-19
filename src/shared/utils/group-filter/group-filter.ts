import { BehaviorSubject, Observable, map } from 'rxjs';

type All = {
  type: 'all';
  value: Observable<boolean>;
  onChange: () => void;
};

type Group<T> = {
  type: 'group';
  group: T;
  value: Observable<boolean>;
  onChange: () => void;
};

type Item<V> = {
  type: 'item';
  data: V;
  value: Observable<boolean>;
  onChange: () => void;
};

export type GroupItem<T, V> = All | Group<T> | Item<V>;

export class GroupFilter<V, T extends keyof V>
  implements Iterable<All | Group<T> | Item<V>>
{
  constructor(
    private allValues: V[],
    selectedValues: V[],
    private groupBy: T
  ) {
    this._selectedValues = new Set(selectedValues);
  }

  *[Symbol.iterator]() {
    yield <All>{
      type: 'all',
      value: this.subject.pipe(map(() => this.isAll)),
      onChange: this.toggleAll,
    };

    for (let index = 0; index < this.allValues.length; index++) {
      const item = this.allValues[index];

      if (item[this.groupBy] !== this.allValues[index - 1]?.[this.groupBy]) {
        yield <Group<T>>{
          type: 'group',
          group: item[this.groupBy],
          value: this.subject.pipe(
            map(() => this.isSelectedGroup(item[this.groupBy]))
          ),
          onChange: () => this.toggleGroup(item[this.groupBy]),
        };
      }

      yield <Item<V>>{
        type: 'item',
        data: item,
        value: this.subject.pipe(map(() => this.isSelectedItem(item))),
        onChange: () => this.toggleItem(item),
      };
    }
  }

  private _selectedValues: Set<V>;
  public get selectedValues() {
    return [...this._selectedValues];
  }
  private subject = new BehaviorSubject<GroupFilter<V, T>>(this);

  public asObservale = () => this.subject.asObservable();

  public get isAll() {
    return this._selectedValues.size === this.allValues.length;
  }

  public toggleAll = () => {
    if (this.isAll) {
      this._selectedValues.clear();
    } else {
      this._selectedValues = new Set(this.allValues);
    }
    this.subject.next(this);
  };

  private getGroupValues(groupValue: V[T]) {
    return this.allValues.filter(item => item[this.groupBy] === groupValue);
  }

  public isSelectedGroup(groupValue: V[T]) {
    return this.getGroupValues(groupValue).every(item =>
      this._selectedValues.has(item)
    );
  }

  public toggleGroup = (groupValue: V[T]) => {
    if (this.isAll) {
      this._selectedValues.clear();
      this.selectGroup(groupValue);
    } else if (!this.isSelectedGroup(groupValue)) {
      this.selectGroup(groupValue);
    } else {
      this.unselectGroup(groupValue);
    }

    this.subject.next(this);
  };

  private selectGroup(groupValue: V[T]) {
    for (const value of this.getGroupValues(groupValue)) {
      this._selectedValues.add(value);
    }
  }

  private unselectGroup(groupValue: V[T]) {
    for (const value of this.getGroupValues(groupValue)) {
      this._selectedValues.delete(value);
    }
  }

  public isSelectedItem(item: V) {
    return this._selectedValues.has(item);
  }

  public toggleItem = (item: V) => {
    if (this.isAll) {
      this._selectedValues.clear();
      this._selectedValues.add(item);
    } else if (this._selectedValues.has(item)) {
      this._selectedValues.delete(item);
    } else {
      this._selectedValues.add(item);
    }

    this.subject.next(this);
  };

  public clear() {
    this._selectedValues = new Set(this.allValues);
    this.subject.next(this);
  }
}
