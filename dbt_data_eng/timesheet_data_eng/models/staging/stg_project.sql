{{
    config(
        tags=['basic', 'staging']
    )
}}


WITH

required_fields AS (


    SELECT 
        CAST(PID AS INT) AS  project_id,
        CLIENT_NAME,
        NAME AS project_name,
        TO_DATE(STARTDATE, 'DD-MM-YYYY') AS project_from,
        TO_DATE(ENDDATE, 'DD-MM-YYYY') AS project_to

    FROM {{ source('TF_SYSTEM', 'PROJECT') }}

)


SELECT * FROM required_fields