import Spinner from "../../../ui/Spinner";
import InformationModelTable from "./InformationModelTable";
import useModel from "./useViewModel";

function ViewCarModel({ id }) {
  console.log(id);
  const { models, modelLoading } = useModel(id);

  if (modelLoading) return <Spinner />;

  const active = models.is_active === 1 ? "True" : "False";
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
