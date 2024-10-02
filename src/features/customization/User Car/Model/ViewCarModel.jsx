import Spinner from "../../../../ui/Spinner";
import InformationModelTable from "./InformationModelTable";
import useViewModel from "./useViewModel";

function ViewCarModel({ id }) {
  const { models, modelLoading } = useViewModel(id);

  if (modelLoading) return <Spinner />;

  const active = models.is_active === true ? "True" : "False";

  return (
    <InformationModelTable
      data={{
        id: models.id,
        englishName: models.name.en,
        arabicName: models.name.ar,
        isActive: active,
      }}
      title={`${models.name.en} `}
    />
  );
}

export default ViewCarModel;
