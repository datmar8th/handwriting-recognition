import Draw from "../../components/Draw/Draw";

const Writer = () => {
  return (
    <section id="write" class="section">
      <div class="title">
        <h2>
          Write It Yourself
        </h2>
      </div>
      <div className="howitworks--canvas">
        <Draw />
      </div>
    </section>
  );
};

export default Writer;