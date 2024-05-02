interface ListProps<T> {
  items: Array<T>;
  RenderItem: React.FC<T>;
}

async function HorizontalList<T>({ items, RenderItem }: ListProps<T>) {
  return (
    <div className="flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
      {items.map((item: T) => RenderItem(item))}
    </div>
  );
}

export default HorizontalList;
