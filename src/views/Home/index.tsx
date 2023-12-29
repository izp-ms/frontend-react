import { Box, Stack } from "@mui/material";
import styles from "./styles.module.scss";
import postcardImage from "../../assets/svg/postcard.svg";
import dotsImage from "../../assets/svg/dots.svg";
import linesStreightImage from "../../assets/svg/lines-streight.svg";
import googlePlayCard from "../../assets/png/google-play.png";
import appStoreCard from "../../assets/png/app-store.png";
import preview1 from "../../assets/png/logowanie.png";
import preview2 from "../../assets/png/obrazki_nasze.png";
import preview3 from "../../assets/png/profil_z_info.png";
export const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.postcard_section}>
        <div className={styles.postcard_section_content}>
          <Stack className={styles.postcard_section_information}>
            <h2>Postcardia</h2>
            <p>
              Welcome to Postcardia, where every step of your journey becomes a
              beautiful postcard to share with the world! Available on both the
              Play Store and Apple Store, Postcardia is the ultimate social
              networking app that seamlessly combines the thrill of GPS
              navigation with the nostalgia of collecting and sharing postcards.
            </p>
          </Stack>
          <Stack className={styles.postcard_section_images}>
            <img
              className={styles.postcard_image}
              src={postcardImage}
              alt="Postcard"
            />
            <img className={styles.dots_image} src={dotsImage} alt="Dots" />
          </Stack>
        </div>
      </div>
      <Box
        className={styles.download_section}
        sx={{ backgroundColor: "background.paper", color: "text.primary" }}
      >
        <Box className={styles.download_section_content}>
          <Stack className={styles.download_section_information}>
            <div className={styles.download_now}>
              <h2 style={{ zIndex: 1 }}>DOWNLOAD NOW</h2>
              <div className={styles.download_now_shadow} />
            </div>
            <p>
              Ready to embark on your Postcardia journey? Download Now and start
              collecting memories that last a lifetime.
            </p>
          </Stack>
          <div className={styles.lines_streight_image_wrapper}>
            <img
              className={styles.lines_streight_image}
              src={linesStreightImage}
              alt="Lines"
            />
          </div>
          <div className={styles.store_cards_wrapper}>
            <img
              className={styles.store_card}
              src={googlePlayCard}
              alt="Google play"
            />
            <img
              className={styles.store_card}
              src={appStoreCard}
              alt="App store"
            />
          </div>
        </Box>
      </Box>
      <div className={styles.photos_section}>
        {/* <p className={styles.info_img}>
            Let your adventures come to life! Use GPS navigation to explore and
            collect virtual postcards from the places you visit. Your map of
            memories grows with each step, creating a visual diary of your
            travels.
          </p> */}
        <div className={styles.background_trapezoid}></div>
        <div className={styles.preview_wrapper}>
          <img className={styles.preview} src={preview1} alt="Preview" />
          <img className={styles.preview} src={preview2} alt="Preview" />
          <img className={styles.preview} src={preview3} alt="Preview" />
        </div>
      </div>

      <div className={styles.source}>
        <a
          target="_blank"
          href="https://www.freepik.com/free-vector/hand-drawn-abstract-landscape-cover-collection_15591719.htm"
          rel="noreferrer"
        >
          Source of postcard images
        </a>
      </div>
    </div>
  );
};
