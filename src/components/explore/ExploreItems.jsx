import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import Skeleton from "../UI/Skeleton"
import NftDisplayCard from "../UI/NftDisplayCard"
import axios from "axios";

const ExploreItems = () => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const [numToShow, setNumToShow] = useState(8)

  const [apiLink, setApiLink] = useState("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore")

  useEffect(() => {
    async function getData() {
      let response = (await axios.get(apiLink)).data
      setData(response)
      setLoading(false)
    }
    getData()
  },[apiLink])
  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={(event) => {
          setLoading(true)
          setApiLink(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${event.target.value}`)
        }}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading ? new Array(8).fill(0).map((_, index) => (
        <Skeleton
        key={index}
        height={400}
        width={300}
        borderRadius={10}/>
        ))
      :
      data.map((elm, index) => (
        <NftDisplayCard
        key={index}
        elm={elm}
        isHome={false}/>
      )).slice(0,numToShow)}
      <div className="col-md-12 text-center">
        <button to="" id="loadmore" className="btn-main lead" onClick={() => {
          if ((numToShow + 4) <= data.length) {
            setNumToShow((prev) => (prev+4))
          }
        }}>
          Load more
        </button>
      </div>
    </>
  );
};

export default ExploreItems;
