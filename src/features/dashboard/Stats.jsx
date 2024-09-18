import Stat from "./Stat";

function Stats({ totalUser, totalDrivers, totalVehicles, totalRides }) {
  return (
    <>
      <Stat
        backgroundColor="#A855F7"
        title="Total Users"
        colorIconBackground="#D9B7F9"
        icon="/Usersw.svg"
        value={totalUser}
      />
      <Stat
        title="Total Drivers"
        backgroundColor="#EC4899"
        colorIconBackground="#F8B0D4"
        icon="/Driversw.svg"
        value={totalDrivers}
      />

      <Stat
        title="Total Vehicles"
        backgroundColor="#F97316"
        colorIconBackground="#FAB98C"
        icon="/Cars.svg"
        value={totalVehicles}
      />
      <Stat
        title="Total Rides"
        backgroundColor="#10B981"
        colorIconBackground="#9ee5c2"
        icon="/Ridesw.svg"
        value={totalRides}
      />
    </>
  );
}

export default Stats;
