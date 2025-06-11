"""Create relatives column for the good

Revision ID: 6e03b46356aa
Revises: 
Create Date: 2025-06-11 15:39:27.506913

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '6e03b46356aa'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    op.create_table(
        'goods_relatives',
        sa.Column('id', sa.Integer, primary_key=True, index=True),
        sa.Column('good_one', sa.Integer, sa.ForeignKey('goods.id'), nullable=False),
        sa.Column('good_two', sa.Integer, sa.ForeignKey('goods.id'), nullable=False),
        sa.Column('difference', sa.String, nullable=False),
        sa.Column('diff_value', sa.String, nullable=True)
    )

def downgrade():
    op.drop_table('goods_relatives')