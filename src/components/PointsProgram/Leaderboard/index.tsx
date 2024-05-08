'use client'
import { Button, Pagination, PaginationMobile } from '@/src/components/UI'
import Item from './Item'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { totalCampaigns } from '@/src/library/utils/campaigns'

const Leaderboard = ({ data }: any) => {
  const [itemsPerPage, setItemPerPage] = useState<any>(20)
  const [activePage, setActivePage] = useState<number>(1)
  const arr = [...data]
  const [sort, setSort] = useState(false)
  const handleSort = () => setSort(!sort)

  function paginate(items: any, currentPage: number, itemsPerPage: number) {
    // Calculate total pages
    const totalPages = Math.ceil(items.length / itemsPerPage)

    // Ensure current page isn't out of range
    currentPage = Math.max(1, Math.min(currentPage, totalPages))

    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage
    const paginatedItems = items.slice(start, end)

    return paginatedItems
  }

  const pagination = sort ? paginate(arr.reverse(), activePage, itemsPerPage) : paginate(data, activePage, itemsPerPage)

  return (
    <div className="mb-10 w-full">
      <div className="flex flex-col xl:flex-row items-start w-full justify-between mb-8 xl:items-center">
        <h5 className="text-white text-lg mb-3 font-medium">Leaderboard</h5>
        {/* <Button className="w-full xl:w-auto">
          <span>
            Refer your friends to move up
            <i className="icon-copy ml-3"></i>
          </span>
        </Button> */}
      </div>
      <div className="relative">
        <div className="flex items-center w-full mb-3">
          <span className="text-white w-36 text-center text-sm">#</span>
          <span className="text-white w-full text-sm">
            Ranking Addresses
            {/* <i className="icon-chevron text-xs ml-2"></i> */}
          </span>
          <span className="text-white w-36 text-center text-sm">
            RINGS
            <i
              className={`icon-chevron text-xs ml-2 cursor-pointer ${sort ? '' : 'rotate-180'}`}
              onClick={() => handleSort()}
            ></i>
          </span>
        </div>
        {pagination.map((data: any, index: number) => (
          <Item key={index} data={data} />
        ))}
        {/* {sort === false && data.map((data: any, index: number) => <Item key={index} data={data} />)}
        {sort &&
          arr.sort((a, b) => b.rank - a.rank).map((data: any, index: number) => <Item key={index} data={data} />)} */}
        <Pagination
          className="mx-auto"
          numberPages={Math.ceil(data.length / itemsPerPage)}
          activePage={activePage}
          setActivePage={setActivePage}
          itemsPerPage={itemsPerPage}
          setItemPerPage={setItemPerPage}
        />
        <div className="lg:hidden">
          <PaginationMobile
            count={data.length}
            itemsPerPage={itemsPerPage}
            setItemPerPage={setItemPerPage}
            activePage={activePage}
            setActivePage={setActivePage}
            className="mx-auto"
            numberPages={Math.ceil(data.length / itemsPerPage)}
          />
        </div>
      </div>
    </div>
  )
}

export default Leaderboard
