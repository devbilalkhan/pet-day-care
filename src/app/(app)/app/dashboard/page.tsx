import H1 from "@/components/h1";

type PageProps = {};

function Page(props: PageProps) {
  return (
    <main>
      <div className="flex items-center justify-between text-white py-8">
        <section>
          <H1>
            Pet
            <span className="font-semibold">Store</span>
          </H1>
          <p className="text-lg opacity-70">
            Manage your pet daycare like a pro
          </p>
        </section>
        <section className="text-center">
          <p className="text-2xl font-bold leading-6">10</p>
          <p className="opacity-70">Current guests</p>
        </section>
      </div>
    </main>
  );
}

export default Page;
