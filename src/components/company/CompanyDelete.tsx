import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { deleteCompany } from "../../store/company/company-actions";
import DeleteActions from "../modals/DeleteActions";
import Modal from "../modals/Modal";

const CompanyDelete = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentCompany = useAppSelector(
    (state) => state.companies.currentCompany
  );

  const deleteHandler = () => {
    dispatch(deleteCompany(currentCompany.id!));
    navigate("/companies");
  };

  const renderActions: () => JSX.Element = () => {
    return (
      <DeleteActions routePath={`/companies`} deleteHandler={deleteHandler} />
    );
  };

  const renderContent = () => {
    return <p>Are you sure you want to delete this company?</p>;
  };

  return (
    <div className="container">
      <Modal
        title="Delete Company"
        content={renderContent}
        actions={renderActions}
        onDismiss={() => {
          navigate("/companies");
        }}
      />
    </div>
  );
};

export default CompanyDelete;
