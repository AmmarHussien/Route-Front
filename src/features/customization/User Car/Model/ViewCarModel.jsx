import { useTranslation } from "react-i18next";
import Spinner from "../../../../ui/Spinner";
import InformationModelTable from "./InformationModelTable";
import useViewModel from "./useViewModel";

function ViewCarModel({ id }) {
  const { i18n, t } = useTranslation();
  const isRTL = i18n.language === "ar-EG";
  const { models, modelLoading } = useViewModel(id);

  if (modelLoading) return <Spinner />;

  const active = models.is_active
    ? isRTL
      ? "نعم" // Yes in Arabic
      : "True" // True in English
    : isRTL
    ? "لا" // No in Arabic
    : "False"; // False in English

  return (
    <InformationModelTable
      id={models.id}
      data={{
        [t("modelId")]: models.id,
        [t("englishName")]: models.name.en,
        [t("arabicName")]: models.name.ar,
        [t("isActive")]: active,
      }}
      title={isRTL ? `${models.name.ar} ` : `${models.name.en}`}
    />
  );
}

export default ViewCarModel;
