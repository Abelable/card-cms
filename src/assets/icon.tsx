import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";

const AddressSvg = () => (
  <svg viewBox="0 0 1024 1024" width="1em" height="1em">
    <path
      d="M821.653333 633.813333L576.533333 917.333333a85.333333 85.333333 0 0 1-129.066666 0.064L198.634667 629.952c-1.152-1.322667-2.133333-2.773333-2.88-4.266667A361.088 361.088 0 0 1 149.333333 448c0-200.298667 162.368-362.666667 362.666667-362.666667s362.666667 162.368 362.666667 362.666667c0 63.744-16.490667 125.162667-47.381334 179.370667a21.269333 21.269333 0 0 1-5.632 6.421333zM792.32 602.453333A318.442667 318.442667 0 0 0 832 448c0-176.725333-143.274667-320-320-320-176.725333 0-320 143.274667-320 320 0 55.317333 14.037333 108.522667 40.384 155.733333l247.317333 285.738667a42.666667 42.666667 0 0 0 64.554667-0.021333L792.32 602.453333zM512 597.333333a149.333333 149.333333 0 1 1 0-298.666666 149.333333 149.333333 0 0 1 0 298.666666z m0-42.666666a106.666667 106.666667 0 1 0 0-213.333334 106.666667 106.666667 0 0 0 0 213.333334z"
      fill="#ffffff"
    />
  </svg>
);

export const AddressIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={AddressSvg} {...props} />
);
