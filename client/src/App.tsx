function App() {
  let flags:string[] = [];

  return (
    <div className="text-md text-red-200 m-9 p-7 border-amber-200 border-b-6">
      {
        flags.map((flagImage) => <img src={flagImage} />)


      }
    </div>
  );
}

export default App;
