import React from "react";
import Button from "@mui/core/Button";
import MobileStepper from "@mui/core/MobileStepper";
import Paper from "@mui/core/Paper";
import KeyboardArrowRight from "@mui/icons/KeyboardArrowRight";
import Typography from "@mui/core/Typography";
import { useTheme } from "@mui/core/styles";
import KeyboardArrowLeft from "@mui/icons/KeyboardArrowLeft";
 
const MyCollection = [
  {
    label: "First Picture",
    imgPath:
"https://media.geeksforgeeks.org/wp-content/uploads/20210208000010/1.png",
  },
  {
    label: "Second Picture",
    imgPath:
"https://media.geeksforgeeks.org/wp-content/uploads/20210208000009/2.png",
  },
  {
    label: "Third Picture",
    imgPath:
"https://media.geeksforgeeks.org/wp-content/uploads/20210208000008/3.png",
  },
];
 
const App = () => {
  const CollectionSize = MyCollection.length;
  const theme = useTheme();
  const [index, setActiveStep] = React.useState(0);
 
  const goToNextPicture = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
 
  return (
    <div
      style={{
        marginLeft: "40%",
      }}
    >
      <h2>How to Create Image Slider in ReactJS?</h2>
      <div
        style={{
          maxWidth: 400,
          flexGrow: 1,
        }}
      >
        <Paper
          square
          elevation={0}
          style={{
            height: 50,
            display: "flex",
            paddingLeft: theme.spacing(4),
            backgroundColor: theme.palette.background.default,
            alignItems: "center",
          }}
        >
          <Typography>{MyCollection[index].label}</Typography>
        </Paper>
        <img
          src={MyCollection[index].imgPath}
          style={{
            height: 255,
            width: "100%",
            maxWidth: 400,
            display: "block",
            overflow: "hidden",
          }}
          alt={MyCollection[index].label}
        />
        <MobileStepper
          variant="text"
          position="static"
          index={index}
          steps={CollectionSize}
          nextButton={
            <Button
              size="small"
              onClick={goToNextPicture}
              disabled={index === CollectionSize - 1}
            >
              Next
              {theme.direction !== "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
            </Button>
          }
        />
      </div>
    </div>
  );
};
 
export default App;