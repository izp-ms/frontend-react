import Button from '@mui/material/Button';
//import ./index.scss;
import styles from './styles.module.scss';
import { useGetUsersQuery } from '../../services/user.service';
import { getCurrentUser } from '../../services/auth.service';
import { AddButton } from '../../components/AddButton';
import { useTypedSelector } from '../../store';
import img1 from '../../assets/Logo.png';
import img2 from '../../assets/background_polygon.png';
import img3 from '../../assets/brightness.png';
import img4 from '../../assets/Flag_of_Great_Britain.png';
import img5 from '../../assets/Flag_of_Poland.png';
import img6 from '../../assets/google_play.png';
import img7 from '../../assets/ios_app.png';
import img8 from '../../assets/lang.png';
import img9 from '../../assets/login_variant.png';
import img10 from '../../assets/pattern_1.png';
import img11 from '../../assets/pattern_2.png';
import img12 from '../../assets/pattern_3.png';
import img13 from '../../assets/postcard.png';
import img14 from '../../assets/preview.png';
import { DecorationLabel } from '../../components/DecorationLabel';


export const Home = () => {
  const { data, error, isLoading, refetch } = useGetUsersQuery();

  const user = useTypedSelector((state) => state.auth.user);

  return (
    <div className={styles.container1}>
      <nav className={styles.nav}>
        <div className={styles.nav_logo}>
          <div className={styles.nav_logo_image}>
            <img className={styles.nav_logo_image__img} src={img1}/>
          </div>
          <h1 className={styles.nav_logo__h}>postcardia</h1>
        </div>
        <div className={styles.nav_menu}>
          <a className={styles.nav_menu_sign} href="./login">
            <button className={styles.nav_menu_sign_btn}>
              <img className={styles.nav_menu_sign_btn__img} src={img9}/>
              <p className={styles.nav_menu_sign_btn__p}>SIGN IN</p>
            </button>
          </a>
          <a target="_blank" href="https://www.google.com/">
          <button className={styles.nav_menu_color}>
          
            <img className={styles.nav_menu_color__img} src={img3}/>
          
          </button>
          </a>
          <button className={styles.nav_menu_lang}>
            <img className={styles.nav_menu_lang__img} src={img8}/>
          </button>
        </div>
        
      </nav>
      
      <section className={styles.header}>
        <div className={styles.header_intro}>
            <h1 className={styles.header_intro__h}>Pocztówka</h1>
            <div className={styles.header_intro_picture}>
              <img className={styles.header_intro_picture__img} src={img13}/> 
            </div>
            <p className={styles.header_intro__p}>Marzyłeś kiedyś o pocztówce ale nie wiesz gdzie je znaleźć? Może chciałbyś wysłać pocztówke znajomemu ale nie wiesz czy to nie przestarzały sposób. My spieszymy z rozwiązaniem Postcardia to nowoczesna platforma na której można wymieniać się pocztówkami i dzielić się swoją podróżą z innymi!!! </p>
        </div>
        
        <div className={styles.header_mosaic}>
          <img className={styles.header_mosaic__img} src={img10}/> 
        </div>
      </section>

      <section className={styles.download}>
        <h1 className={styles.download__h}>DOWNLOAD NOW</h1>
        <p className={styles.download__p}>Zabierz swoją przygodę do kieszeni, dziel się i łącz gdziekolwiek jesteś!Nasza strona posiada także wersje mobilną! Pobierz już teraz, dostępna jest w Apple Store i Google Play!</p>
        <div className={styles.download_links}>
          <a target="_blank" className={styles.download_links_btn} href="https://www.apple.com/app-store/">
            <img className={styles.download_links_btn__img} src={img7}/>
          </a>
          <a target="_blank" className={styles.download_links_btn} href="https://play.google.com/">
            <img className={styles.download_links_btn__img} src={img6}/>
          </a>
        </div>
        <div className={styles.download_decoration}>
          <img className={styles.download_decoration__img} src={img11}/>
        </div>
      </section>

      <section className={styles.preview}>
        <div className={styles.preview_profile}>
          <img className={styles.preview_profile__img} src={img14}/>
        </div>
        <div className={styles.preview_profile}>
          <img className={styles.preview_profile__img} src={img14}/>
        </div>
        <div className={styles.preview_profile}>
          <img className={styles.preview_profile__img} src={img14}/>
        </div>
      </section>

      <section className={styles.banner}>
        <div className={styles.banner_decoration}>
          <img className={styles.banner_decoration__img_1} src={img12}/>
          <img className={styles.banner_decoration__img_2} src={img12}/>
        </div>
        <DecorationLabel content='taki tam cosik'/>
      </section>

      <footer className={styles.footer}>
        <p className={styles.footer__p}>© 2023 POCZTOWA COMPANY</p>
        <p className={styles.footer__p}>Terms of Service | authors</p>
      </footer>
    </div>
    
  );
};
