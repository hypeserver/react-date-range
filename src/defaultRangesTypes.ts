interface RangeObject {
  endDate: Date;
  startDate: Date;
}

interface StaticRangeHandler {
  label?: String;
  range: (value?: Number) => RangeObject;
  isSelected?: (range: RangeObject) => boolean;
}
