import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import Article from '@/components/article';
import HeaderBlog from '@/components/headerBlog';
import api from '@/server/api';


async function CustomerDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;

  if (!id) return <div>ไม่พบ ID</div>;

  const blogRes = await api.customerWork.getWorkByBlog(id);
  const blog = blogRes.data.data;

  return (
    <div>
      <Navbar />
      <HeaderBlog headText={blog?.title || ''} data={blog} />
      <Article content={blog?.content} />
      <Footer />
    </div>
  );
}

export default CustomerDetail 
