{{
    config(
        tags=['basic', 'staging']
    )
}}


WITH

required_fields AS (


    SELECT 
    CAST(ID AS INT) AS user_ID,
	EMAIL AS user_email,
	CAST(OTP AS INT) AS otp
    FROM {{ source('TF_SYSTEM', 'TEM_OTP') }}

)


SELECT * FROM required_fields