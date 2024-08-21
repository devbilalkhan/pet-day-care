import H1 from "./h1";

type BrandingProps = {};

function Branding(props: BrandingProps) {
  return (
    <>
      <section>
        <H1>
          Pet
          <span className="font-semibold">Store</span>
        </H1>
        <p className="text-lg opacity-70">Manage your pet daycare like a pro</p>
      </section>
    </>
  );
}

export default Branding;
