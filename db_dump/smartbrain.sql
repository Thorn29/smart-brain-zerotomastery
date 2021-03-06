PGDMP     +    )                z           smart_brain    13.4    13.4     ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ?           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ?           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ?           1262    16677    smart_brain    DATABASE     o   CREATE DATABASE smart_brain WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE smart_brain;
                postgres    false            ?            1259    16697    login    TABLE     z   CREATE TABLE public.login (
    id integer NOT NULL,
    hash character varying(100) NOT NULL,
    email text NOT NULL
);
    DROP TABLE public.login;
       public         heap    postgres    false            ?            1259    16695    login_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.login_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.login_id_seq;
       public          postgres    false    203            ?           0    0    login_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.login_id_seq OWNED BY public.login.id;
          public          postgres    false    202            ?            1259    16683    users    TABLE     ?   CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100),
    email text NOT NULL,
    entries bigint DEFAULT 0,
    joined timestamp without time zone NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            ?            1259    16681    users_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    201            ?           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    200            ,           2604    16700    login id    DEFAULT     d   ALTER TABLE ONLY public.login ALTER COLUMN id SET DEFAULT nextval('public.login_id_seq'::regclass);
 7   ALTER TABLE public.login ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    203    202    203            *           2604    16686    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    200    201    201            ?          0    16697    login 
   TABLE DATA           0   COPY public.login (id, hash, email) FROM stdin;
    public          postgres    false    203   ?       ?          0    16683    users 
   TABLE DATA           A   COPY public.users (id, name, email, entries, joined) FROM stdin;
    public          postgres    false    201   ~       ?           0    0    login_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.login_id_seq', 3, true);
          public          postgres    false    202            ?           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 2, true);
          public          postgres    false    200            2           2606    16707    login login_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.login
    ADD CONSTRAINT login_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.login DROP CONSTRAINT login_email_key;
       public            postgres    false    203            4           2606    16705    login login_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.login
    ADD CONSTRAINT login_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.login DROP CONSTRAINT login_pkey;
       public            postgres    false    203            .           2606    16694    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    201            0           2606    16692    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    201            ?   ?   x?U?;?0  Й???BA?M҂U?h?ƥ?
j?'n???;?35????aR9XO\?6w???lY#e?b_(??U?;??m*?)?Z?Rj-'^?JB?T??}?L?1?드GF???bJ?????0C??f???Z,Ҿ=??wS?? ??l1?      ?   [   x?3??????????9?z??????FFF?ƺƆ
?fVF?V??z??\??N?99?I@E?1\???????????P?%W? ??T     