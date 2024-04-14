{{
    config(
        ---tags to refer the mart layer
        tags=['mart']
    )
}}

WITH

stg_user AS (

    SELECT
        ---select the necessary features from the user table
        user_ID, user_name, role

    FROM {{ ref('stg_user') }}
),

stg_project AS (

    SELECT
        ---select the necessary features from the project table
        project_id, project_name

    FROM {{ ref('stg_project') }}

),

stg_feedback AS (
    SELECT
        ---select all the features from feedback table
        *

    FROM {{ ref('stg_feedback') }}
),


left_join_user_feed AS (
    ---the features are connected by left join of the tables
    SELECT
        u.*,
        p.*,
        f.q1, f.q2, f.q3, f.q4, f.q5, f.user_comments
    FROM stg_user u
    LEFT JOIN 
        stg_feedback f ON u.user_ID = f.user_ID
    LEFT JOIN 
        stg_project p ON f.project_id = p.project_id
)

SELECT * FROM  left_join_user_feed