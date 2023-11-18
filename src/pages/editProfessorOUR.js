// pages/editProject/[projectId].js
import { useRouter } from 'next/router';
import EditProjectForm from '../components/EditProfOURForm';

const EditProjectPage = () => {
    console.log("EditOURPage");
  const router = useRouter();
  const { projectId } = router.query;

  return (
    <div>
      <h1>Edit OUR</h1>
      {projectId && <EditProjectForm projectId={projectId} />}
    </div>
  );
};

export default EditProjectPage;
