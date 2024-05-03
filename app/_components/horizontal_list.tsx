interface ListProps<T> {
  data: Array<T>;
  renderItem: React.FC<T>;
}

async function HorizontalList<T>({ data, renderItem }: ListProps<T>) {
  return (
    <div className="flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
      {data.map((item: T) => renderItem(item))}
    </div>
  );
}

export default HorizontalList;
