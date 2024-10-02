import Spinner from "../../../ui/Spinner";
import InformationCarServiceTable from "./InformationCarServiceTable";
import useViewCarService from "./useViewCarService";

function ViewCarServiceModal({ id }) {
  const { carService, isLoading } = useViewCarService(id);

  if (isLoading) return <Spinner />;

  return (
    <InformationCarServiceTable
      data={{
        id: carService.id,
        englishName: carService.name.en,
        arabicName: carService.name.ar,
        driverCommission: carService.driver_commission,
        openingPrice: carService.opening_price,
        separationKm: carService.separation_km,
        beforeSeparationPrice: carService.before_separation_price,
        afterSeparationPrice: carService.after_separation_price,
        inOutSeparationKm: carService.in_out_separation_km,
      }}
      title={`${carService.name.en} `}
    />
  );
}

export default ViewCarServiceModal;
