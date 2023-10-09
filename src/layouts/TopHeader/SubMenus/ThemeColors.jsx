const colors = [
  '#06c',
  '#4b6580',
  '#27ae61',
  '#9b58b5',
  '#d64457',
  '#6e9992',
  '#16a086',
  '#e67e22',
  '#d73c8a'
];

const ThemeColors = () => {
  return (
    <div className='flex flex-wrap gap-2 w-28'>
      {colors.map(color => (
        <span
          key={color}
          className='w-[calc(33.33%-8px*2/3)] aspect-square rounded-md cursor-pointer'
          style={{ backgroundColor: color }}
        ></span>
      ))}
    </div>
  );
};

export default ThemeColors;
