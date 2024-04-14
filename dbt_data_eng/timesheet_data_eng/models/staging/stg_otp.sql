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
	EMAIL AS user_email,
	CAST(OTP AS INT) AS otp
    FROM {{ source('TF_SYSTEM', 'TEM_OTP') }}

)


SELECT * FROM required_fields