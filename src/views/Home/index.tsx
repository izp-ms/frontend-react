import { Box, Stack } from "@mui/material";
import styles from "./styles.module.scss";
import postcardImage from '../../assets/svg/postcard.svg';
import dotsImage from '../../assets/svg/dots.svg';
import linesStreightImage from '../../assets/svg/lines-streight.svg';
import googlePlayCard from '../../assets/png/google-play.png';
import appStoreCard from '../../assets/png/app-store.png';
import preview from '../../assets/png/preview.png';

export const Home = () => {
  return (
    <>
      <div className={styles.postcard_section}>
        <div className={styles.postcard_section_content}>
          <Stack className={styles.postcard_section_information}>
            <h2>Postcard</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla congue pulvinar libero, sed accumsan dolor volutpat at. Nam egestas gravida ullamcorper. Aliquam pellentesque fermentum nisl, id dictum dui imperdiet ut. Sed condimentum lobortis commodo. Donec iaculis neque id quam aliquet, non ultrices erat mattis.</p>
          </Stack>
          <Stack className={styles.postcard_section_images}>
            <img className={styles.postcard_image} src={postcardImage} alt="Postcard" />
            <img className={styles.dots_image} src={dotsImage} alt="Dots" />
          </Stack>
        </div>
      </div>
      <Box className={styles.download_section} sx={{ backgroundColor: "background.paper" , color: "text.primary" }}>
        <Box className={styles.download_section_content}>
          <Stack className={styles.download_section_information}>
            <div className={styles.download_now}>
              <h2 style={{ zIndex: 1 }}>DOWNLOAD NOW</h2>
              <div className={styles.download_now_shadow} />
            </div>
            <p>Praesent at condimentum libero, quis ultrices sem. Mauris eleifend lacus ac dolor commodo, non venenatis odio congue. Duis rhoncus ipsum iaculis eleifend mollis. Ut eu risus nec leo laoreet tristique. Fusce accumsan, velit vel rhoncus ultricies, massa tortor pharetra purus, ac condimentum dolor elit a justo. Vestibulum tempus est sit amet lectus dictum, a vestibulum lorem facilisis. Curabitur maximus orci neque, eget feugiat velit ullamcorper quis. Sed eu dolor sit amet risus pharetra sodales ut vitae metus. Ut condimentum volutpat pretium.</p>
          </Stack>
          <div className={styles.lines_streight_image_wrapper}>
            <img className={styles.lines_streight_image} src={linesStreightImage} alt="Lines" />
          </div>
          <div className={styles.store_cards_wrapper}>
            <img className={styles.store_card} src={googlePlayCard} alt="Google play" />
            <img className={styles.store_card} src={appStoreCard} alt="App store" />
          </div>
        </Box>
      </Box>
      <div className={styles.photos_section}>
        <div className={styles.background_trapezoid}></div>
        <div className={styles.preview_wrapper}>
          <img className={styles.preview} src={preview} alt="Preview" />
          <img className={styles.preview} src={preview} alt="Preview" />
          <img className={styles.preview} src={preview} alt="Preview" />
        </div>
      </div>
    </>
  );
};
