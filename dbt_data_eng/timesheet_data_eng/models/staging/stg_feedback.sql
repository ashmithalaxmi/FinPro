{{
    config(
        tags=['basic', 'staging']
    )
}}


WITH

required_fields AS (


    SELECT 
        CAST(ID AS INT) AS user_ID,
        CAST(PID AS INT) AS project_id,
        CAST(Q1 AS INT) AS q1,
        CAST(Q2 AS INT) AS q2,
        CAST(Q3 AS INT) AS q3,
        CAST(Q4 AS INT) AS q4,
        CAST(Q5 AS INT) AS q5,
        COMMENTS AS  user_comments

    FROM {{ source('TF_SYSTEM', 'FEEDBACK') }}

)


SELECT * FROM required_fields