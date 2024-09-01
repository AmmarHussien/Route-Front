import {
  HiOutlineBanknotes,
  HiOutlineCalendarDays,
  HiUsers,
} from "react-icons/hi2";
import Stat from "./Stat";

function Stats({ totalUser, totalDrivers, totalVehicles }) {
  return (
    <>
      <Stat
        backgroundColor="#A855F7"
        title="Total Users"
        colorIconBackground="#D9B7F9"
        icon={<HiUsers />}
        value={totalUser}
      />
      <Stat
        title="Total Drivers"
        backgroundColor="#EC4899"
        colorIconBackground="#F8B0D4"
        icon={<HiOutlineBanknotes />}
        value={totalDrivers}
      />
      <Stat
        title="Total Vehicles"
        backgroundColor="#F97316"
        colorIconBackground="#FAB98C"
        icon={<HiOutlineCalendarDays />}
        value={totalVehicles}
      />
    </>
  );
}

export default Stats;
