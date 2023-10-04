import { Stack } from "@mui/material";
import styles from "./styles.module.scss";
import postcardImage from '../../assets/svg/postcard.svg';
import dotsImage from '../../assets/svg/dots.svg';

export const Home = () => {
  return (
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
  );
};
