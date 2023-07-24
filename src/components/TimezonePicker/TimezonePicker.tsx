import Dropdown from '../ui/dropdown/Dropdown';
import { TIMEZONES } from '../../consts/consts';

type TimezonePickerProps = {
  selectedTimezone: number;
  onChange: (timezoneValue: number) => void;
};

const TimezonePicker = ({
  selectedTimezone,
  onChange,
}: TimezonePickerProps) => {
  return (
    <>
      <Dropdown
        options={TIMEZONES.map((timezone) => timezone.text)}
        selectedOption={
          TIMEZONES.find((timezone) => timezone.value === selectedTimezone)
            ?.text || TIMEZONES[3].text
        }
        onChange={async (option) => {
          const timezone = TIMEZONES.find(
            (timezone) => timezone.text === option,
          )?.value;
          if (!timezone) return;
          onChange(timezone);
        }}
      />
    </>
  );
};

export default TimezonePicker;
