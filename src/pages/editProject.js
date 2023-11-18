// pages/editProject/[projectId].js
import { useRouter } from 'next/router';
import EditProjectForm from '../components/EditProjectForm';

const EditProjectPage = () => {
    console.log("EditProjectPage");
  const router = useRouter();
  const { projectId } = router.query;

  return (
    <div>
      <h1>Edit Project</h1>
      {projectId && <EditProjectForm projectId={projectId} />}
    </div>
  );
};

export default EditProjectPage;
