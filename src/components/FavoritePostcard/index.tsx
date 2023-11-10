import { Box, Button, TablePagination } from "@mui/material";
import { useTypedSelector } from "../../store";
import styles from "./styles.module.scss";
import { useGetPostcardsQuery } from "../../services/postcard.service";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PostcardCard } from "../../components/PostcardCard";
import { Postcard } from "../../models/postcard";


// const [array, setArrayNumber] = useState[1,2,3,4];

// onChange(event){
//   var newArr = this.state.arr;
//   this.setState(previousState => ({
//     myArray: [...previousState.myArray, 'new value']
// }));
// }


// function addFavorite(postcard: Postcard, index: number){
//       var arr = array.length;
// }

// var AppHeader = React.createClass({ 
//   getInitialState : function() {
//      return { showMe : false };
//   },
//   onClick : function() {
//      this.setState({ showMe : true} );
//   },
//   render : function() {
//       if(this.state.showMe) { 
//           return (<div> one div </div>);
//       } else { 
//           return (<a onClick={this.onClick}> press me </a>);
//       } 
//   }
// })





function FavoritePostcards(){



  const favoritePostcardsArray = [
    {
      number: 1,
    },
    {
      number: 2,
    },
    {
      number: 3,
    },
  ];
  const [favoritePostcards, setfavoritePostcards] = useState(favoritePostcardsArray);
  
  const handleAddFavoritePostcard = () => {
    if(favoritePostcards.length >= 6) 
      return alert("You can add only 6 Postcards");
    else{
    setfavoritePostcards((prevfavoritePostcards) => [
        ...prevfavoritePostcards,
        {
            number: favoritePostcards.length +1,
            
        },
    ]);
  };
  };
  
    const handleDeleteFavoritePostcard = (number: number) => {

      setfavoritePostcards(favoritePostcards.filter(item => item.number !== number));
    };
    





  const user = useTypedSelector((state) => state.auth.user);

  const [searchParams, setSearchParams] = useSearchParams();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(6);

  const { data: paginatedData, refetch } = useGetPostcardsQuery({
    searchParams: searchParams.toString(),
  });

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    console.log(newPage);
    setPageNumber(newPage + 1);
    refetch();
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPageSize(parseInt(event.target.value, 10));
    setPageNumber(1);
    refetch();
  };

  useEffect(() => {
    searchParams.set("UserId", user?.id ?? "0");
    searchParams.set("PageSize", pageSize.toString());
    searchParams.set("PageNumber", pageNumber.toString());

    setSearchParams(searchParams);
  }, [pageNumber, pageSize, searchParams, setSearchParams, user?.id]);

 


  
    
  
return(
  <Box className={styles.container} sx={{ color: "text.primary" }}>
  <div className={styles.postcard}>
  <main>
            <ul>
                // Mapping over array of Postcards
                {favoritePostcards.map((favoritePostcard, index) => (
                    // Setting "index" as key because name and age can be repeated, It will be better if you assign uniqe id as key
                    <li key={index}>
                        <span>number: {favoritePostcard.number}</span>
                        
                    </li>
                ))}
                <button onClick={handleAddFavoritePostcard}>Add Postcard</button>
                <button onClick={() =>handleDeleteFavoritePostcard(favoritePostcards.length)}>Delete Postcard</button>
            </ul>
        </main>
      <div>
        <div className={styles.postcard_list}>
          {paginatedData?.content?.map((postcard: Postcard, index) => (
            <div>
               {/* <div className={styles.favorite_number}>{array.[2]}</div> */}
            <PostcardCard postcard={postcard} />
            <span className={styles.update} onClick={() =>{
                 //addFavorite(postcard, index);
                // favorite();
            }}>
              <Button 
              variant="contained"
              className={styles.btn}
              >
                Add
              </Button>
            </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  <TablePagination
    className={styles.pagination}
    component="div"
    count={paginatedData?.totalCount ?? 0}
    page={pageNumber - 1}
    onPageChange={handleChangePage}
    rowsPerPage={pageSize}
    onRowsPerPageChange={handleChangeRowsPerPage}
    rowsPerPageOptions={[2, 3, 6]}
  />
</Box>
  );
};
export default FavoritePostcards;







