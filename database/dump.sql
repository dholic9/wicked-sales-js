--
-- PostgreSQL database dump
--

-- Dumped from database version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)

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

ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
ALTER TABLE ONLY public.carts DROP CONSTRAINT carts_pkey;
ALTER TABLE ONLY public."cartItems" DROP CONSTRAINT "cartItems_pkey";
ALTER TABLE public.products ALTER COLUMN "productId" DROP DEFAULT;
ALTER TABLE public.orders ALTER COLUMN "orderId" DROP DEFAULT;
ALTER TABLE public.carts ALTER COLUMN "cartId" DROP DEFAULT;
ALTER TABLE public."cartItems" ALTER COLUMN "cartItemId" DROP DEFAULT;
DROP SEQUENCE public."products_productId_seq";
DROP TABLE public.products;
DROP SEQUENCE public."orders_orderId_seq";
DROP TABLE public.orders;
DROP SEQUENCE public."carts_cartId_seq";
DROP TABLE public.carts;
DROP SEQUENCE public."cartItems_cartItemId_seq";
DROP TABLE public."cartItems";
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: cartItems; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."cartItems" (
    "cartItemId" integer NOT NULL,
    "cartId" integer NOT NULL,
    "productId" integer NOT NULL,
    price integer NOT NULL
);


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."cartItems_cartItemId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."cartItems_cartItemId_seq" OWNED BY public."cartItems"."cartItemId";


--
-- Name: carts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.carts (
    "cartId" integer NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: carts_cartId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."carts_cartId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: carts_cartId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."carts_cartId_seq" OWNED BY public.carts."cartId";


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    "orderId" integer NOT NULL,
    "cartId" integer NOT NULL,
    name text NOT NULL,
    "creditCard" text NOT NULL,
    "shippingAddress" text NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: orders_orderId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."orders_orderId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_orderId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."orders_orderId_seq" OWNED BY public.orders."orderId";


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    "productId" integer NOT NULL,
    name text NOT NULL,
    price integer NOT NULL,
    image text NOT NULL,
    "shortDescription" text NOT NULL,
    "longDescription" text NOT NULL
);


--
-- Name: products_productId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."products_productId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_productId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."products_productId_seq" OWNED BY public.products."productId";


--
-- Name: cartItems cartItemId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems" ALTER COLUMN "cartItemId" SET DEFAULT nextval('public."cartItems_cartItemId_seq"'::regclass);


--
-- Name: carts cartId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts ALTER COLUMN "cartId" SET DEFAULT nextval('public."carts_cartId_seq"'::regclass);


--
-- Name: orders orderId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN "orderId" SET DEFAULT nextval('public."orders_orderId_seq"'::regclass);


--
-- Name: products productId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN "productId" SET DEFAULT nextval('public."products_productId_seq"'::regclass);


--
-- Data for Name: cartItems; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."cartItems" ("cartItemId", "cartId", "productId", price) FROM stdin;
1	11	3	29
2	12	3	29
3	13	3	29
4	14	6	9
5	15	6	9
6	15	3	29
7	15	4	119
8	15	3	29
9	15	3	29
10	16	4	119
11	16	6	9
12	16	3	29
13	16	3	29
14	16	4	119
15	16	2	39
16	17	5	99
17	18	2	1499
18	18	4	9999
19	18	5	2999
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.carts ("cartId", "createdAt") FROM stdin;
1	2020-01-14 22:48:01.619062+00
2	2020-01-14 22:48:36.64083+00
3	2020-01-14 23:02:10.478019+00
4	2020-01-14 23:02:48.781542+00
5	2020-01-14 23:03:29.367628+00
6	2020-01-14 23:03:47.988372+00
7	2020-01-14 23:04:46.06274+00
8	2020-01-14 23:05:31.839023+00
9	2020-01-14 23:07:48.44041+00
10	2020-01-14 23:09:51.478537+00
11	2020-01-14 23:18:41.111105+00
12	2020-01-14 23:23:33.481771+00
13	2020-01-14 23:24:32.863675+00
14	2020-01-14 23:26:05.285844+00
15	2020-01-14 23:33:44.332635+00
16	2020-01-15 01:19:41.879794+00
17	2020-01-15 18:12:05.43415+00
18	2020-02-05 22:15:10.204288+00
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders ("orderId", "cartId", name, "creditCard", "shippingAddress", "createdAt") FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products ("productId", name, price, image, "shortDescription", "longDescription") FROM stdin;
6	Ducky MIYA Pro Panda Mechanical Keyboard	13500	/images/panda.jpg	White LED 65% Dye Sub PBT Mechanical Keyboard	MIYA Pro Panda\nThe Ducky MIYA Pro Panda Edition is a compact gaming keyboard in the TKL-Mini format that uses just 65% percent of the space of a full keyboard. It is based on the Varmilo VA68M and offers an impressive and unique design in black, white, green and even includes a panda motif on the spacebar! The keyboard blends unique looks with a white LED backlight and premium Cherry MX switches. Due to its diminutive dimensions, the Ducky MIYA Pro Panda Edition is incredibly portable as well.
5	Obinslab Anne Pro 2 White	8900	/images/anne-pro2white.jpg	RGB LED 60% Double Shot PBT Mechanical Keyboard	Features\nCan be used wired over USB-C or wirelessly over Bluetooth 4.0\nLarge 1900 mah battery with Built-in on/off switch to conserve battery power\nObinsLab Starter companion computer software for programming keyboard layout, function keys, lighting effects, battery life monitoring, macros, and updating firmware\nBluetooth functionality is compatible with Windows, Mac, Linux, iOS, and Android.
4	Obinslab Anne Pro 2 Black	8900	/images/anne-pro2.jpg	RGB LED 60% Double Shot PBT Mechanical Keyboard	Features\nCan be used wired over USB-C or wirelessly over Bluetooth 4.0\nLarge 1900 mah battery with Built-in on/off switch to conserve battery power\nObinsLab Starter companion computer software for programming keyboard layout, function keys, lighting effects, battery life monitoring, macros, and updating firmware\nBluetooth functionality is compatible with Windows, Mac, Linux, iOS, and Android.
1	Ducky One 2 Mini Pure White	9900	/images/one2miniwhite.png	RGB LED 60% Double Shot PBT Mechanical Keyboard	Features:\n10 additional PBT Double Shot colorful keycaps (Random color)\nIncludes Ducky Year of the Pig Limited Edition spacebar\nBrand new bezel design and Dual layer PCB\nPBT double - shot seamless keycaps\nSupports Ducky Macro 2.0, the most powerful hardware available in the market\n3 level adjustable feet and Detachable USB Type - C cable\nBrand new RGB lighting modes and mode architecture\n60% size, lightweight and extremely portable\n
2	Ducky Mecha Mini	11900	/images/ducky-mecha.jpg	RGB LED 60% Double Shot PBT Mechanical Keyboard	The Ducky One 2 Mini Mecha is everything you love about the classic One 2 Mini wrapped in one of the most beautifully balanced frames ever used in a keyboard. The Mechas ground-breaking cast aluminum frame offers stunning aesthetics with curves and features that bulky CNC machined Aluminum frames can only dream of. The weight of the frame is substantial but also balanced and not just heavy for the sake of being heavy. You have to feel it to believe it.\n\n\nThe Mecha comes equipped with PBT double shot seamless keycaps with side laser engraving. It has a smaller size, but no functions have been sacrificed. Supports Ducky Macro V2.0 and Mouse control function.\n\n\nTo stand out in the crowd we chose to use PBT seamless double-shot keycaps. It is designed and engineered in a way to provide the user with the best durability and typing experience. Varieties of colorways available.\n\n\nDetachable USB Type-C cable provides convenience to users. The Mecha uses USB HID with the highest frequency of 1000Hz polling rate, meaning the keyboard is sending its input signal(s) to your PC 1000 times per second. This feature minimizes the delay of when the keys are being pressed and signal received by the computer.\n\n\nEvery Ducky One 2 Mini Mecha comes with 10 additional PBT Double-Shot Colorful keycaps (Random color)
3	Ducky MIYA Pro Sakura Mechanical Keyboard	11900	/images/sakura.jpg	LED 65% Dye Sub PBT Mechanical Keyboard	Sakura Pattern Mechanical Keyboard, Perfect For Girl Gaming Lover\nFn+ Keys to Trigger the Side-engraved Keys Function\nChange Functions Between "1" to "+" and "F1"to "F12" Through Fn+ Pagedown and Fn+ Pageup\nSuspended Keycaps\nN-key Rollover\nType-C Port, Seperate Keyboard and Cable Design\nWarmilo Profession Programmable Drive\nOriginal Cherry MX Black switches\nPBT Keycaps
\.


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."cartItems_cartItemId_seq"', 19, true);


--
-- Name: carts_cartId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."carts_cartId_seq"', 18, true);


--
-- Name: orders_orderId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."orders_orderId_seq"', 1, false);


--
-- Name: products_productId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."products_productId_seq"', 1, false);


--
-- Name: cartItems cartItems_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems"
    ADD CONSTRAINT "cartItems_pkey" PRIMARY KEY ("cartItemId");


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY ("cartId");


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY ("orderId");


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY ("productId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

