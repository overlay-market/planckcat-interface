import {
  BaseQueryApi,
  BaseQueryFn,
} from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { createApi } from "@reduxjs/toolkit/query/react";
import { ClientError, gql, GraphQLClient } from "graphql-request";
import { AppState } from "../state";
import { DocumentNode } from "graphql";
import { SupportedChainId } from "../../constants/chains";

const CHAIN_SUBGRAPH_URL: Record<number, string> = {
  [SupportedChainId.ARBITRUM]:
    "https://api.thegraph.com/subgraphs/name/bigboydiamonds/planckcats-subgraph",
};