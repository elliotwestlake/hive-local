import { Icon } from "./Icon";

/** − 20.5° + in half degrees. */
export function Stepper({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="stepper">
      <button className="round" onClick={() => onChange(value - 0.5)} aria-label="Lower">
        <Icon name="minus" />
      </button>
      <span className="stepper-value">{value.toFixed(1)}°</span>
      <button className="round" onClick={() => onChange(value + 0.5)} aria-label="Raise">
        <Icon name="plus" />
      </button>
    </div>
  );
}
