import { useTranslation } from "react-i18next";
import Spinner from "../../../ui/Spinner";
import InformationCarServiceTable from "./InformationCarServiceTable";
import useViewCarService from "./useViewCarService";

function ViewCarServiceModal({ id }) {
  const { carService, isLoading } = useViewCarService(id);
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar-EG";
  if (isLoading) return <Spinner />;

  return (
    <InformationCarServiceTable
      data={carService.id}
      title={isRTL ? `${carService.name.ar}` : `${carService.name.en} `}
      isLoading={isLoading}
    />
  );
}

export default ViewCarServiceModal;
