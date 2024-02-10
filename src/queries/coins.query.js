'use client';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
        queryKey: ['Q'],
        queryFn: () => fetchCoins(pagination)
    });

export const useQueryCoinDetails = (id) =>
    useQuery({
        queryKey: ['QQQ'],
        queryFn: () => fetchCoinDetails(id)
    });