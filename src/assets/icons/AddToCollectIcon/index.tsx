import React from 'react';
import Svg, {Path} from 'react-native-svg';
import IIconProps from 'icons/icontypes';
import useTheme from 'hooks/useTheme';

const AddToCollecIcon = ({color, fill_color}: IIconProps): JSX.Element => {
  const theme = useTheme();

  return (
    <Svg width="19" height="18" viewBox="0 0 19 18" fill={fill_color}>
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.5 13.5H14.75C15.5788 13.5 16.25 12.8288 16.25 12V3.75C16.25 2.92125 15.5788 2.25 14.75 2.25H6.5C5.67125 2.25 5 2.92125 5 3.75V12C5 12.8288 5.67125 13.5 6.5 13.5Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M16.25 9.75H13.6745C13.4112 9.75 13.1667 9.888 13.0317 10.1145L12.719 10.6365C12.5832 10.8623 12.3395 11.001 12.0763 11.001H9.17525C8.912 11.001 8.6675 10.863 8.5325 10.6365L8.21975 10.1145C8.08325 9.888 7.83875 9.75 7.5755 9.75H5"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M2.75 5.25V14.25C2.75 15.0788 3.42125 15.75 4.25 15.75H13.25"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default AddToCollecIcon;
