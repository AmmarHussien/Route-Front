import { useTranslation } from "react-i18next";
import Stat from "./Stat";

function Stats({ totalUser, totalDrivers, totalVehicles, totalRides }) {
  const { t } = useTranslation();

  return (
    <>
      <Stat
        backgroundColor="#A855F7"
        title={t("TotalUsers")}
        colorIconBackground="#D9B7F9"
        icon="/Usersw.svg"
        value={totalUser}
      />
      <Stat
        title={t("TotalDrivers")}
        backgroundColor="#EC4899"
        colorIconBackground="#F8B0D4"
        icon="/Driversw.svg"
        value={totalDrivers}
      />

      <Stat
        title={t("TotalVehicles")}
        backgroundColor="#F97316"
        colorIconBackground="#FAB98C"
        icon="/Cars.svg"
        value={totalVehicles}
      />
      <Stat
        title={t("TotalRides")}
        backgroundColor="#10B981"
        colorIconBackground="#9ee5c2"
        icon="/Ridesw.svg"
        value={totalRides}
      />
    </>
  );
}

export default Stats;
