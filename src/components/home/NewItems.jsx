import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import NftDisplayCard from "../UI/NftDisplayCard";

const NewItems = () => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getData() {
      let response = (await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")).data
      setData(response)
      setLoading(false)
    }
    getData()
  },[])

  const options = {
    responsive: {
        0: {
            items: 1,
        },
        768: {
            items: 2,
        },
        980: {
            items: 3,
        },
        1200: {
            items: 4,
        },
    },
};

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading ?
            new Array(4).fill(4).map((_,index) => (
            <Skeleton
            key={index}
            width={"300px"}
            height={"400px"}
            borderRadius={15}/>
                ))
          :
          <OwlCarousel className='owl-theme' loop dots={false} items={4} margin={10} {...options} nav
          touchDrag={false}>
          {data.map((elm) => (
            <NftDisplayCard
            elm={elm}
            isHome={true}/>
          ))}
          </OwlCarousel>
          }
        </div>
      </div>
    </section>
  );
};

export default NewItems;
