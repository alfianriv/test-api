--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 13.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: db_test; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE db_test WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE db_test OWNER TO postgres;

\connect db_test

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: tb_products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tb_products (
    id integer NOT NULL,
    sku character varying(50) NOT NULL,
    name character varying(50),
    price integer DEFAULT 0,
    image character varying,
    description character varying NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone
);


ALTER TABLE public.tb_products OWNER TO postgres;

--
-- Name: tb_products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tb_products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tb_products_id_seq OWNER TO postgres;

--
-- Name: tb_products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tb_products_id_seq OWNED BY public.tb_products.id;


--
-- Name: tb_transactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tb_transactions (
    id integer NOT NULL,
    product_id integer,
    type character varying(3),
    qty integer DEFAULT 0,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone
);


ALTER TABLE public.tb_transactions OWNER TO postgres;

--
-- Name: tb_transactions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tb_transactions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tb_transactions_id_seq OWNER TO postgres;

--
-- Name: tb_transactions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tb_transactions_id_seq OWNED BY public.tb_transactions.id;


--
-- Name: tb_products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_products ALTER COLUMN id SET DEFAULT nextval('public.tb_products_id_seq'::regclass);


--
-- Name: tb_transactions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_transactions ALTER COLUMN id SET DEFAULT nextval('public.tb_transactions_id_seq'::regclass);

--
-- Name: tb_products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tb_products_id_seq', 516, true);


--
-- Name: tb_transactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tb_transactions_id_seq', 189, true);


--
-- Name: tb_products tb_products_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_products
    ADD CONSTRAINT tb_products_pk PRIMARY KEY (id);


--
-- Name: tb_transactions tb_transactions_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_transactions
    ADD CONSTRAINT tb_transactions_pk PRIMARY KEY (id);


--
-- Name: tb_products_sku_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX tb_products_sku_uindex ON public.tb_products USING btree (sku);


--
-- PostgreSQL database dump complete
--

