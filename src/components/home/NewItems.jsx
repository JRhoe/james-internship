import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import ExpiryCountdown from "../UI/ExpiryCountdown";

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
          {data.map((elm, index) => (
            // <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
            <div key={index}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${elm.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Creator: Monica Lucas"
                  >
                    <img className="lazy" src={elm.authorImage} alt={elm.authorId} />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                
                {elm.expiryDate && <ExpiryCountdown
                 expiryDate={elm.expiryDate}/>}

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>

                  <Link to={`/item-details/${elm.nftId}`}>
                    <img
                      src={elm.nftImage}
                      className="lazy nft__item_preview"
                      alt={elm.nftId}
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4>{elm.title}</h4>
                  </Link>
                  <div className="nft__item_price">{elm.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{elm.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          </OwlCarousel>
          }
        </div>
      </div>
    </section>
  );
};

export default NewItems;
