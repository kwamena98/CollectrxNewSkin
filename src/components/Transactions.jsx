import React, { useContext,useState,useEffect } from "react";
import useFetch from "../hooks/useFetch";

const TransactionsCard = ({usernames,upvotes, url,keyword }) => {
  const gifUrl = useFetch({ keyword });

  function formatNumber(number) {
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + "M";
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + "K";
    } else {
      return number.toString();
    }
  }

  return (
    <div className="bg-[#181918] m-4 flex flex-1
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      min-w-full
      flex-col p-3 rounded-md hover:shadow-2xl"
    >
      <div className="flex flex-col items-center w-full mt-3">
        <div className="display-flex justify-start w-full mb-6 p-2">


            <p className="text-white text-base">{usernames}</p>

          <p className="text-white text-base">{formatNumber(upvotes)}</p>
        </div>
        <img
          src={gifUrl || url}
          alt="nature"
          className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
        />
        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
        <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
          Upvote
        </li>
        </div>
      </div>
    </div>
  );
};

const Transactions = () => {


  const [items,setItem] = useState([
  
    {
      id: '1',
      title: 'El Classico',
      image: 'https://phantom-marca.unidadeditorial.es/ea73e309d4d83235044dbbe48f124f4b/resize/1320/f/jpg/assets/multimedia/imagenes/2022/11/21/16690544280122.jpg',
      votes:'1000',
      username:"derrickdadson"
    },
    {
      id: '2',
      title: 'Diamond',
      image: 'https://pbs.twimg.com/media/FpGRkeoaAAAG7U8?format=jpg&name=small',
      votes:'11',
      username:"sabina"
    },
    {
      id: '3',
      title: 'Rizz',
      image: 'https://pbs.twimg.com/media/FpGRzVYXgAAlx5x?format=jpg&name=small',
      votes:'20',
      username:"nk"
    },
    {
      id: '4',
      title: 'Cubic',
      image: 'https://pbs.twimg.com/media/FpGSHQmXgAAWBIf?format=jpg&name=small',
      votes:'14',
      username:"gooba"
    },
   
  ]);
  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {/* {currentAccount ? (
          <h3 className="text-white text-3xl text-center my-2">
            NFTS
          </h3>
        ) : (
          <h3 className="text-white text-3xl text-center my-2">
            Connect your account to see the latest transactions
          </h3>
        )} */}

<h3 className="text-white text-3xl text-center my-2">
            NFTS
          </h3>

        <div className="flex flex-wrap justify-center items-center mt-10">
          {/* {[...dummyData, ...transactions].reverse().map((transaction, i) => (
            <TransactionsCard key={i} {...transaction} />
          ))} */}

{items &&
        items
          .sort((a, b) => b.votes - a.votes)
          .map((item) => (
          <TransactionsCard key={item.id} url={item.image} upvotes={item.votes} usernames={item.username}/>
             
          
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
