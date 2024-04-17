import { Grid } from "@chakra-ui/react";
import Lottie from "react-lottie-player";
import LoadingAnimation from "../../assets/loadingAnimation.json";

function Loading() {
  return (
    <Grid h="100vh" placeContent="center">
      <Lottie
        loop
        animationData={LoadingAnimation}
        play
        style={{ width: 250, height: 250 }}
      />
    </Grid>
  );
}

export default Loading;
