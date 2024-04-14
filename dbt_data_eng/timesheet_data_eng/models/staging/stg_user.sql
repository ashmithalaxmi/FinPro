{{
    config(
        ---tags to refer the staging layer
        tags=['basic', 'staging']
    )
}}


WITH

required_fields AS (


    SELECT 
        --- casting of necessary features and following naming conventions
        CAST(ID AS INT) AS user_ID,
        NAME AS user_name,
        role AS Role,
        password,
        EMAIL AS user_email
    FROM {{ source('TF_SYSTEM', 'USER') }}

)


SELECT * FROM required_fields