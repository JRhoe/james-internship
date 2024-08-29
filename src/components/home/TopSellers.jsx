import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getData() {
      let response = (await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers")).data
      setData(response)
      setLoading(false)
    }
    getData()
  },[])


  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol data-aos="fade-in" className="author_list">
              {loading ? new Array(12).fill(0).map((_, index) => (
                <li key={index}>
                  <div className="author_list_pp">
                    <Skeleton
                    height={50}
                    width={50}
                    borderRadius={100}/>
                      <i className="fa fa-check"></i>
                  </div>
                  <div className="author_list_info">
                    <Skeleton height={20} width={150} borderRadius={5}/>
                    <span><Skeleton height={20} width={75} borderRadius={5}/></span>
                  </div>
                </li>
              ))
              :
                data.map(elm => (
                  <li key={elm.id}>
                  <div className="author_list_pp">
                    <Link to={`/author/${elm.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={elm.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${elm.authorId}`}>{elm.authorName}</Link>
                    <span>{elm.price} ETH</span>
                  </div>
                </li>
                ))
              }
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
