export default function TimingSelection({
  className,
  name,
  value,
  onSelectionChange,
  timing = [],
}) {
  return (
    <div className={className}>
      <select name={name} value={value} onChange={onSelectionChange}>
        {timing.length > 0 &&
          timing?.map((hour) => (
            <option key={hour} value={parseInt(hour)}>
              {hour}
            </option>
          ))}
        {timing?.length === 0 && <option value={0}>00</option>}
      </select>
    </div>
  );
}
