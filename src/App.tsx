import Button from "./Components/Button";
import { SimaraThemeContext, useSimaraToast } from "./Global/Context";
import { DefaultSimaraThemeData } from "./Global/ThemeData";

function App() {
  const toast = useSimaraToast();
  return (
    <SimaraThemeContext.Provider
      value={{ themeData: { ...DefaultSimaraThemeData } }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          onClick={() => {
            toast({
              title: `This must stay for 3 seconds`,
              duration: 3000,
              message: "Hello",
              intent: "danger",
            });
          }}
        >
          3 Sec
        </Button>
        <Button
          onClick={() => {
            toast({
              title: `This must stay for 6 seconds`,
              duration: 6000,
              message: "Hello",
              intent: "warning",
            });
          }}
        >
          6 Sec
        </Button>
        <Button
          onClick={() => {
            toast({
              title: `This must stay for 12 seconds`,
              duration: 12000,
              message: "Hello",
              intent: "success",
            });
          }}
        >
          12 Sec
        </Button>
      </div>
    </SimaraThemeContext.Provider>
  );
}

export default App;
