'use client';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import queryConfig from "./config.query";

const coinsQueryKey = ['COINS_LIST'];
const coinDetailsQueryKey = ['COIN_DETAILS'];

const fetchCoins = (pagination) =>
    axios
        .get('http://localhost:5000/coins', { params: pagination })
        .then((res) => res.data);

const fetchCoinDetails = (id) =>
    axios
        .get(`http://localhost:5000/coinDetails/${id}`)
        .then((res) => res.data);


export const useQueryCoins = (pagination) =>
    useQuery({
        queryKey: coinsQueryKey.concat(pagination.page.toString()).concat(pagination.pageSize.toString()),
        queryFn: () => fetchCoins(pagination),
        ...queryConfig
    });

export const useQueryCoinDetails = (id) =>
    useQuery({
        queryKey: coinDetailsQueryKey.concat(id),
        queryFn: () => fetchCoinDetails(id),
        ...queryConfig
    });